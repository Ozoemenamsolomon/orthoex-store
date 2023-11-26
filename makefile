
# remote repo = origin
# remote main branch = main or master
# remote testing repo = testing
# working branch = rehabspace

# git add . git commit -m 'updating main repo' git push origin main

# staging to main repo for PR from remote branch - git push origin rehabspace
git add . 
git commit -m 'staging to main repo for PR from remote branch - rehabspace' 
git push origin rehabspace

# updating my-test-repo repo' 
git add . 
git commit -m 'updating my-test-repo repo' 
git push testing rehabspace

# pull from my testing repo.
git pull testing rehabspace

# pull from my origin repo.
git pull origin rehabspace
