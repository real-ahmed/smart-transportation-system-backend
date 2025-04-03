import { Model } from 'mongoose';

export function paginate(page: number, limit: number) {
  const offset = (page - 1) * limit;
  return { offset, limit };
}

export async function getPaginatedResults(model: Model<any>, page: number, limit: number, filter: Record<string, any>) {
  const { offset } = paginate(page, limit);
  const totalDocuments = await model.countDocuments(filter).exec();
  const totalPages = Math.ceil(totalDocuments / limit);
  const results = await model.find(filter).skip(offset).limit(limit).exec();
  return { results, totalPages, currentPage: page };
}
