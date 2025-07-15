import { Schema, Types } from 'mongoose';

// 🔸 1. Schemas
export const EmployeeDataSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true, lowercase: true },
});

export const OtpSchema = new Schema({
  expiry: { type: Date, required: true },
  value: { type: Number, required: true },
});

export const CurrentStateSchema = new Schema({
  track: { type: Schema.Types.ObjectId, trim: true, ref: 'track', required: true },
  level: { type: Schema.Types.ObjectId, trim: true, ref: 'level', required: true },
  template: { type: Schema.Types.ObjectId, trim: true, ref: 'template', required: true },
  completed: { type: Boolean, default: false, required: true },
  timeSpend: { type: Number, default: 0, required: true },
});

// 🔸 2. Utility Functions

interface GroupFilterInput {
  name: string;
  value: string[];
}

export const createGroupFilterQuery = (
  org: string,
  property: GroupFilterInput[]
): Record<string, any> => {
  const filterData = property.map((value) => {
    const object: Record<string, any> = {
      'employeeData.name': { $eq: value.name },
    };

    const subQuery = value.value.map((filterVal) => ({
      'employeeData.value': { $eq: filterVal },
    }));

    return { ...object, $or: subQuery };
  });

  return { $and: [{ organization: new Types.ObjectId(org) }, ...filterData] };
};

export const createUserIdQuery = (
  org: string,
  employeeIds: string[]
): Record<string, any> => {
  const filterData = employeeIds.map((id) => ({
    $and: [{ organization: new Types.ObjectId(org) }, { _id: { $eq: id } }],
  }));

  return { $or: filterData };
};

interface EmployeeIdObj {
  employeeId: string;
}

export const createUserIdFindQuery = (
  employeeIds: EmployeeIdObj[],
  org: string
): Record<string, any> => {
  const filterData = employeeIds.map((value) => ({
    $and: [{ organization: new Types.ObjectId(org) }, { employeeId: { $eq: value.employeeId } }],
  }));

  return { $or: filterData };
};
