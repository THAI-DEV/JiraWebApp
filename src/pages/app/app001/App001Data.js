import { userService, projectService } from '../../../service/app/AppService';
import { today } from './../../../util/util';

export const defaultDropDownVal = { name: 'ไม่ระบุ', code: null };
export const defaultBeginVal = today();
export const defaultEndVal = today();

export const assigneeList = [defaultDropDownVal];
export const reporterList = [defaultDropDownVal];
export const projectList = [defaultDropDownVal];

export const operatorList = ['AND', 'OR'];

export async function initUser() {
  await userService()
    .then(function (returnData) {
      returnData.map((item) => {
        assigneeList.push({ name: item.displayName, code: item.accountId });
        reporterList.push({ name: item.displayName, code: item.accountId });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log('call rest user');
}

export async function initPeoject() {
  await projectService()
    .then(function (returnData) {
      returnData.map((item) => {
        projectList.push({ name: item.name, code: item.name });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log('call rest project');
}
