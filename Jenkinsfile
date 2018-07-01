pipeline {

  agent any

  stages {
    stage('build') {
      agent {
        docker {
          image 'node:8-alpine'
          reuseNode true
        }
      }
      steps {
        sh 'npm install'
        sh 'npm run build'
        sh 'rm site.zip'
        zip archive: true, dir: 'dist', glob: '', zipFile: 'site.zip'
      }
    }
    stage('deploy') {
      steps {
        echo 'deploying to nginx...'

        withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ci', keyFileVariable: 'SSH_ID')]) {
          sh "scp -i ${SSH_ID} site.zip jenkins@nginx:~/site.zip"
          sh "ssh -i ${SSH_ID} jenkins@nginx unzip ~/site.zip -d /sites/narrator" 
        }
      }
    }
  }
}
