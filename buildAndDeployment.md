Important gulp tasks
===
```
gulp watch - starts express and opens webbrowser, autoreloads server and client
gulp build - runs bower install and scrapes filenames from index.html and concatentes/minifies them in to dist/
gulp test - checks code for style guide compliance
```

Deployment cycle
===
1. Merge pull request into master
2. circle ci builds docker image and pushes it to dockerhub
3. dockerhub calls a webhook from tutum
4. causes tutum to redeploy service to digital ocean
5. Notify slack channel about redeployment

Setup continuous deployment
===
1. Connect circle ci to your github org
2. Create a dockerhub account
3. Configure circle ci environment variables
  - Under project settings/environment variables:
  - Add dockerhub account by setting DOCKER_EMAIL, DOCKER_USER, DOCKER_PASS
  - Variables are write only, so don't worry about using a personal password
    in DOCKER_PASS
4. Set the correct dockerhub org/repo in the circle.yml file
  - replace teamartemis/artemis with your dockerhub repo
5. Check everything is working by building the project manually
  - Click the build button in circle ci

Setup deployment to digital ocean
===
1. Create an account with tutum and digital ocean
2. Connect digital ocean account to tutum
3. Create a node and a service
4. Add a service redeploy webhook to dockerhub
5. Under account info/notifications/slack add the slack webhook - ask adam for it...

Congrats
===
If you had fun and want to explore tutum some more, you can set up loadbalancing
across two container instances. If you use more than one container instance you
need to configure the volume to map to the same host path.
