import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com'
});

const GitHub = {
  users: {
    async orgs(username: string) {
      const { data } = await client.get(`/users/${username}/orgs`);
      return data;
    },

    async repos(username: string) {
      const { data } = await client.get(`/users/${username}/repos`);
      return data;
    },

    async user(username: string) {
      const { data } = await client.get(`/users/${username}`);
      return data;
    }
  }
};

export default GitHub;
