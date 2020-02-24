import { HttpLink } from "apollo-link-http"

const link = new HttpLink({
  uri: "https://0fh7c.sse.codesandbox.io/"
});

const options = {
  link
};

export default options;
