pipeline {
    agent any
    
    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS' // Use the correct NodeJS version
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/njanfang/appnode.git' // Replace with your GitHub repo URL
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies using npm
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Run your tests (e.g., with Jest or Mocha)
                    sh 'npm test'
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Optionally, run any build step (e.g., bundling JS files)
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy to Server') {
            steps {
                script {
                    // SSH into the server and deploy
                    sh '''
                    ssh root@139.162.143.148 "cd /var/appnode/appnode && git pull origin main && npm install && pm2 reload ecosystem.config.js"
                    '''
                }
            }
        }
        
        stage('Restart NGINX') {
            steps {
                script {
                    // Restart NGINX to apply changes
                    sh '''
                    ssh root@139.162.143.148 "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded'
        }
        
        failure {
            echo 'Pipeline failed'
        }
    }
}
