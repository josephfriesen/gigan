pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 80:80 -p 443:443'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }
  }
}