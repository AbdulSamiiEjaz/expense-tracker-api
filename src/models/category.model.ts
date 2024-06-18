import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @prop({ required: true, minlength: 1, maxlength: 20 })
  title: string;

  @prop({ required: true, ref: () => User })
  userId: Ref<User>;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
