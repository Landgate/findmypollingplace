npm install -g generator-angular
mkdir slip-demos2 && cd $_
yo angular app
bower install font-awesome

npm install -g grunt-cli
npm install grunt grunt-gh-pages

grunt serve

http://stackoverflow.com/questions/16298986/unable-to-connect-to-github-com-for-cloning
git config --global url."https://".insteadOf git://
