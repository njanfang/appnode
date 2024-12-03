pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'appnode', type: 'ToolInstallation'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/njanfang/appnode.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'npm test'  // if you have tests set up
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'  // if you have a build step
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                script {
                    sh 'pm2 restart ecosystem.config.js --env production'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Finished!'
        }
    }
}
