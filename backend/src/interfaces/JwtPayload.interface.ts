import { UserRole } from '../entity/enum/UserRole.enum';

export interface JwtPayload {
  userId: number;
  role: UserRole;
}
