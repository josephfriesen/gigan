pipeline {
  agent {
    docker {
      image 'node:lts-bullseye-slim'
      args '-p 3000:3000'
    }
  }
  stages {
    stage('Let\'s build this sucker') {
      steps {
        sh 'npm ci'
      }
    }
  }
}