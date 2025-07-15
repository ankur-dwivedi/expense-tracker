import jwt from 'jsonwebtoken';
import createError from 'http-errors';
// import * as User from '../models/user/services';
// import { frequencyData, passFailData } from './constants';
// import { RequestHandler } from 'express';

// interface AnalyticsParams {
//   groupId?: string;
//   trackId?: string;
//   levelId?: string;
// }

// interface EmpData {
//   levelStatus?: string;
//   levelScore?: number;
//   learnerId: string;
//   session?: number;
//   updatedAt?: Date;
// }

export const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });

export const createUnauthorizedError = (error: string = 'Unauthorized') => createError(401, error);

// const getEmpAttemptData = async (params: AnalyticsParams): Promise<(EmpData | null)[]> => {
//   if (params.groupId) {
//     const group = await Group.get({ id: params.groupId });
//     return group.employees;
//   } else if (params.trackId) {
//     const track = await Track.getUsersByTrackId({ id: params.trackId });
//     const employees = track.groupId.reduce((acc: any[], group: any) => acc.concat(group.employees), []);
//     const employeeIds = employees.map((e: any) => e._id);
//     return Array.from(new Set(employeeIds));
//   }
//   return [];
// };

// export const analyicsData = async ({ groupId, trackId, levelId }: AnalyticsParams) => {
//   passFailData[0].passed = 0;
//   passFailData[1].failed = 0;
//   passFailData[2].unattempted = 0;

//   for (let x = 0; x <= 9; x++) frequencyData[x].frequency = 0;

//   const empData = await getEmpAttemptData({ groupId, trackId, levelId });

//   empData.forEach((data) => {
//     if (data && data.levelStatus) {
//       switch (data.levelStatus) {
//         case LEVEL_STATUS.PASS:
//           passFailData[0].passed += 1;
//           break;
//         case LEVEL_STATUS.FAIL:
//           passFailData[1].failed += 1;
//           break;
//       }
//     } else {
//       passFailData[2].unattempted += 1;
//     }

//     if (data && data.levelScore !== undefined) {
//       const index = data.levelScore === 100
//         ? Math.floor(data.levelScore / 10) - 1
//         : Math.floor(data.levelScore / 10);
//       frequencyData[index].frequency += 1;
//     }
//   });

//   return { passFailData, frequencyData };
// };

// export const analyicslist = async ({ groupId, trackId, levelId }: AnalyticsParams) => {
//   let empData = await getEmpAttemptData({ groupId, trackId, levelId });

//   const level = await Level.get({ id: levelId });
//   const track = await Track.get({ id: trackId });

//   empData = empData.filter((data) => data !== null);

//   const result = await Promise.all(
//     empData.map(async (data) => {
//       if (data) {
//         const userData = await User.getUserAnalytics({ id: data.learnerId });
//         return {
//           group: userData.groups,
//           track: track.trackName,
//           level: level.levelName,
//           name: userData.name,
//           employeeId: userData.employeeId,
//           score: data.levelScore,
//           status: data.levelStatus,
//           numOfAttempts: data.session,
//           dateOfAttempt: data.updatedAt,
//         };
//       }
//     })
//   );

//   return result.filter(Boolean);
// };
