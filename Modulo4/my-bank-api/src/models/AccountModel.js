import mongoose from 'mongoose';

const AccountsSchema = mongoose.Schema(
  {
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const AccountModel = mongoose.model('accounts', AccountsSchema);

export { AccountModel };
