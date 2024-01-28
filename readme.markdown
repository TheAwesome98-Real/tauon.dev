# [tauon.dev](https://tauon.dev)

meow :3

this is a website written in eleventy

the commands are:
- `yarn build`: build for production
- `yarn serve`: build and serve for dev
- `yarn update`: update, install dependencies, and build (for server)

additionally, to run `yarn update` automatically, you can do this:
1. generate a secret by running `openssl rand -hex 64`
2. add a github webhook on your repository for `https://example.com/update.php`
3. add the secret
4. create a file called `.env`
5. write this:
```ini
[config]
secret=... ; the secret that was generated before
user=... ; the user that has access to yarn
```
6. done

finally, you may do dynamic data in the `prebuild.js` file. this currently
refreshes owned 88x31s, and refreshes geometry dash data. it could,
perhaps, get build date and commit hash.
