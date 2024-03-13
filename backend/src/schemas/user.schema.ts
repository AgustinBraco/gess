import { Schema, Document } from 'mongoose';

interface IService {
  location_id: string;
  service_id: string;
  comment: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  services: IService[];
  favorites_id: string[];
  created_at: Date;
  updated_at: Date;
  active: boolean;
  activation_token: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  },
  phone: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['GESTOR', 'USUARIO', 'ADMIN']
  },
  avatar: { type: String, required: false },
  services: [{
    location_id: { type: String, required: true },
    service_id: { type: String, required: true },
    comment: { type: String, required: false }
  }],
  favorites_id: { type: [String], required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  activation_token: { type: String, required: false, select: false }
})

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

export { UserSchema }