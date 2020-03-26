export const silentLogin = () => ({
  method: "get",
  url: `/users/me`,
  headers: {
    "Content-Type": "application/json"
  }
});

export const loginApi = props => {
  return {
    method: "post",
    url: `/users/login`,
    body: props,
    headers: {
      "Content-Type": "application/json"
    }
  };
};
export const createUserApi = props => {
  return {
    method: "post",
    url: `/users`,
    body: props,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const FBloginApi = props => {
  return {
    method: "post",
    url: `/auth/facebook/callback`,
    body: props,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const logoutApi = props => {
  return {
    method: "post",
    url: `/users/login`,
    body: props,
    headers: {
      "Content-Type": "application/json"
    }
  };
};
