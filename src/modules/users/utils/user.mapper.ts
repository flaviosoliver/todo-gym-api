import { UserDto } from '../dtos/user.dto';
import { User } from '../user.model';

export const mapUser = (user: User): UserDto => {
  return <UserDto>{
    id: user.id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    active: user.active,
    shape: user.shape,
  };
};
