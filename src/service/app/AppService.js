import { userAllRest, projectAllRest, genJqlRest, issueTotalRest, issueAllRest } from './../rest/RestService';
import { userInfoData } from './../../data/nick_name-data';

export async function userService() {
  let result;

  await userAllRest()
    .then(function (respData) {
      result = respData;
      result = mapNickName(result);
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function projectService() {
  let result;

  await projectAllRest()
    .then(function (respData) {
      result = respData;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function genJqlService(formData) {
  let result;

  await genJqlRest(formData)
    .then(function (respData) {
      result = respData;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function issueTotalService(formData) {
  let result;

  await issueTotalRest(formData)
    .then(function (respData) {
      result = respData;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

export async function issueAllService(formData) {
  let result;

  await issueAllRest(formData)
    .then(function (respData) {
      result = respData;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}

function mapNickName(inputData) {
  let result = [];
  inputData.map((item) => {
    const findData = userInfoData.find((obj) => obj.displayName === item.displayName);

    if (findData) {
      result.push({ ...item, displayName: findData.nickName });
    } else {
      result.push({ ...item });
    }
  });

  return result;
}
