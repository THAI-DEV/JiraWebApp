import { userAllRest, projectAllRest } from './../rest/RestService';

export async function userService() {
  let result;

  await userAllRest()
    .then(function (respData) {
      result = respData;
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
