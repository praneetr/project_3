import axios from "axios";

const BASEURL = "localhost:5000";

// formData = {
//   token: config.Authorization,
//   email: 'some@email.com',
//   password: 'somepassword'
// };

var headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGVhNDljOTI4NGFlMTYzNzI2NzlhYiIsInVzZXJuYW1lIjoiZGVtb0BkZW1vLmNvbSIsImlhdCI6MTUyNDU0MDc5NCwiZXhwIjo4MDU2MzgwNzk0fQ.HYTAP78RxBF4phZ4zV8RJc5O9by_2mPQcjJVQKlC0FI'
}
export default {
  register: function (formData) {
    return axios.post('http://' + BASEURL + '/users/register', formData);
  }
};
