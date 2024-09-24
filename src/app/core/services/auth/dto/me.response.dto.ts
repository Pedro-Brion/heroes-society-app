import { User } from '../../../models/User';

export interface MeResponseDTO {
  user: User;
  access_token: string;
}
