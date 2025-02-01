import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      const searchFilter = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      } as FilterQuery<T>;
      this.modelQuery = this.modelQuery.find(searchFilter) as unknown as Query<
        T[],
        T
      >;
    }
    return this;
  }
  /*
  filter() {
    const queryObj = { ...this.query }; //copy of "query"
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
   */

  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);

    // Handle availability filter
    if (queryObj.availability) {
      if (queryObj.availability === 'in-stock') {
        queryObj.quantity = { $gt: 0 };
      } else if (queryObj.availability === 'out-of-stock') {
        queryObj.quantity = { $lte: 0 };
      }
      delete queryObj.availability;
    }

    // Handle price range filter
    if (queryObj.minPrice || queryObj.maxPrice) {
      queryObj.price = {} as Record<string, number>;
      if (queryObj.minPrice) {
        (queryObj.price as Record<string, number>).$gte = Number(
          queryObj.minPrice,
        );
        delete queryObj.minPrice;
      }
      if (queryObj.maxPrice) {
        (queryObj.price as Record<string, number>).$lte = Number(
          queryObj.maxPrice,
        );
        delete queryObj.maxPrice;
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit || 0;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQuery = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQuery);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return { total, totalPages, page, limit };
  }
}

export default QueryBuilder;
