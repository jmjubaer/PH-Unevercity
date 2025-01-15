import config from '../config';
import { USER_ROLES } from '../modules/users/user.constant';
import { User } from '../modules/users/users.model';

const supperAdminData = {
  id: '0001',
  password: config.supper_admin_password,
  email: 'superadmin@gmail.com',
  needsPasswordChange: false,
  role: 'supperAdmin',
  status: 'in-progress',
};
const seedSupperAdmin = async () => {
  const isSupperAdminExist = await User.findOne({
    role: USER_ROLES.supperAdmin,
  });
  if (!isSupperAdminExist) {
    await User.create(supperAdminData);
  }
};

export default seedSupperAdmin;
