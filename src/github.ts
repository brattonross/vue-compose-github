import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com'
});

const GitHub = {
  users: {
    async followers(username: string) {
      const { data } = await client.get(`/users/${username}/followers`);
      return data;
    },

    async orgs(username: string) {
      const { data } = await client.get(`/users/${username}/orgs`);
      return data;
    },

    async projects(username: string) {
      const { data } = await client.get(`/users/${username}/projects`, {
        headers: {
          Accept: 'application/vnd.github.inertia-preview+json'
        }
      });
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
