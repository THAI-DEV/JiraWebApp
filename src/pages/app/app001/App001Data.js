import {
  userService,
  projectService,
  genJqlService,
  issueTotalService,
  issueAllService,
} from '../../../service/app/AppService';
import { today, tomorrow } from './../../../util/util';

export const defaultDropDownVal = { name: 'ไม่ระบุ', code: null };
export const defaultBeginVal = today();
export const defaultEndVal = tomorrow();

export const assigneeList = [defaultDropDownVal];
export const reporterList = [defaultDropDownVal];
export const projectList = [defaultDropDownVal];

export const operatorList = ['AND', 'OR'];

export async function initUser() {
  await userService()
    .then(function (returnData) {
      projectList.splice(0, assigneeList.length);
      projectList.splice(0, reporterList.length);
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
      projectList.splice(0, projectList.length);

      returnData.map((item) => {
        projectList.push({ name: item.name, code: item.key });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log('call rest project');
}

export async function genJql(formData) {
  let jql = '';

  await genJqlService(formData)
    .then(function (returnData) {
      jql = returnData;
    })
    .catch(function (error) {
      console.log(error);
    });

  // console.log('call rest project');

  return jql;
}

export async function issueTotal(formData) {
  let result = '';

  await issueTotalService(formData)
    .then(function (returnData) {
      result = returnData;
    })
    .catch(function (error) {
      console.log(error);
    });

  // console.log('call rest project');

  return result;
}

export async function issueAll(formData) {
  let result = '';

  await issueAllService(formData)
    .then(function (returnData) {
      result = returnData;
    })
    .catch(function (error) {
      console.log(error);
    });

  // console.log('call rest project');

  return result;
}