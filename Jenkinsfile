pipeline {
  agent {
    docker {
      image 'node:6-alpine'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Zip') {
      steps {
        zip archive: true, dir: 'dist', zipFile: 'site.zip'
      }
    }
  }
}
