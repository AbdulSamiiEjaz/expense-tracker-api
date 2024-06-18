import CategoryModel, { Category } from "../models/category.model";

export function createCategory(input: Partial<Category>) {
  return CategoryModel.create(input);
}

export function getAllCategories() {
  return CategoryModel.find();
}
export function findCategoryById(id: string) {
  return CategoryModel.findById(id);
}
export function findCategoryByTitleAndUser(userId: string, title: string) {
  return CategoryModel.findOne({
    $and: [{ userId }, { title }],
  });
}
