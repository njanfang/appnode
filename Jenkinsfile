pipeline {
    agent any

    environment {
        APP_DIR = "/var/lib/jenkins/workspace/appnode"
        NODE_VERSION = '20.18.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: '48a94152-1ee4-4712-bca1-b91b69379d66', branch: 'main', url: 'https://github.com/njanfang/appnode.git'
            }
        }

        stage('Install Node.js') {
            steps {
                sh 'nvm install $NODE_VERSION'
                sh 'nvm use $NODE_VERSION'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'pm2 stop all'
                sh 'pm2 start ecosystem.config.js'
                sh 'pm2 save'
            }
        }

        stage('Restart Nginx') {
            steps {
                sh 'sudo systemctl restart nginx'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
