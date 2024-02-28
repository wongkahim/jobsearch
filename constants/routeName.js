export default class RouteName {
  static HOME = "/";
  static PROFILE = "/profile/";
  static SEARCH = (id) => `/search/${id}`;
  static JOB_DETAILS = (id) => `/job-details/${id}`;
}
