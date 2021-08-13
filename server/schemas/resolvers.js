const { AuthenticationError } = require('apollo-server-express');
const { User, Dish, Culture, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('pk_test_51JNyFPHDnv6cOa0aA2zqSvaiHFYxSEOb8VpzfeJo4FenWQh8ZymDdedGzlGfF9UIzmcnjiiuvacJlz57jI8HA8zQ00JYJl50eb');

const resolvers = {
  Query: {
    cultures: async () => {
      return await Culture.find({});
    },
    dishes: async (parent, { culture, name }) => {
      const params = {};

      if (culture) {
        params.culture = culture;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Dish.find(params).populate('culture');
    },
    dish: async (parent, { _id }) => {
      return await Dish.findById(_id).populate('culture');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dishes',
          populate: 'culture'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dishes',
          populate: 'culture'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ dishes: args.dishes });
      const line_items = [];

      const { dishes } = await order.populate('dishes').execPopulate();

      for (let i = 0; i < dishes.length; i++) {
        const dish = await stripe.dishes.create({
          name: dishes[i].name,
          description: dishes[i].description,
          images: [`/images/foods/${dishes[i].image}`]
        });

        const price = await stripe.prices.create({
          dish: dish.id,
          unit_amount: dishes[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { dishes }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ dishes });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateDish: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Dish.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
