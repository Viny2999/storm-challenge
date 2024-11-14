import { UserRole } from '../entity/enum/UserRole.enum';

export interface JwtPayload {
  id: number;
  role: UserRole;
}
