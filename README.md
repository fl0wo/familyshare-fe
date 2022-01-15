## Install

```
yarn install
npm run start
```
Run: ===> 
docker build -t familyshare-fe . && docker run -t -i -p 5002:80 --rm familyshare-fe. 

Front End features: 
  -mui react design
  -map view for the children moves: ===> we use Pigeon Maps
  -map view for children in each activity
  -ring countdown timer for each activity
  
Back-end features: 
   - child registration via parent profile
   - tracking the movement of children by longitude and latitude ---> simulation via bot
   - creation of events / activities for children to do 
   - code to verify the valid e-mail: ===> now doesn't work because we don't pay Gmail and we have run out all the test mails
