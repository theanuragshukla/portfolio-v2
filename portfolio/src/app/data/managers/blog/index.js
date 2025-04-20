import client from "../../client";

const reqModal = async (func) => {
  try {
    const { status, data } = await func();
    if (status === 200) {
      return data;
    } else {
      return {
        status: false,
        msg: `request failed with code ${status}`,
      };
    }
  } catch (e) {
    return {
      status: false,
      msg: e.message,
    };
  }
};
export const getAllBlogs = (page = 1) => {
  return reqModal(() =>
    client.get("/blog", {
      params: {
        page,
      },
    })
  );
};

export const deleteOneBlog = (id) => {
  return reqModal(() => client.delete(`/blog/${id}`));
};

export const getOneBlog = (id) => {
  return reqModal(() => client.get(`/blog/${id}`));
};

export const searchBlog = (query) => {
  return reqModal(() =>
    client.get("/blog/search", {
      params: {
        q: query,
      },
    })
  );
};

export const publishBlog = (body) => {
  return reqModal(() => client.post("/blog", body));
};

export const updateBlog = (id, body) => {
  return reqModal(() => client.put(`/blog/${id}`, body));
};
export const getAuthorized = (body) => {
  return reqModal(() => client.post(`/getToken`, body));
};

export const postMsg = (body) => {
  return reqModal(() => client.post(`/contact`, body));
};

export const getRepoCount = (lang) => {
  return reqModal(() => client.get(`/lang-in-repo/${lang}`));
};
