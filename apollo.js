import { HttpLink } from "apollo-link-http"

const link = new HttpLink({
  uri: "http://10.0.2.2:4000"
});

const options = {
  link,
};

export default options;
