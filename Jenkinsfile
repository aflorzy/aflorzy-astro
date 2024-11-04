pipeline {
    agent any

    options {
        ansiColor('xterm')
    }

    parameters {
        choice(name: 'ENV', choices: ['dev', 'prod'], description: 'Select the deployment environment')
        
        string(name: 'MAJOR_MINOR', defaultValue: '1.0', description: 'Major and minor version of build. Patch number set after build.')
    }

    environment {
        VERSION_IMAGE_LABEL = "${MAJOR_MINOR}.${BUILD_NUMBER}-${ENV}"
        REGISTRY_URL="gitea.local.aflorzy.com"
        REGISTRY_CREDENTIALS = credentials('gitea')
        IMAGE_NAME="aflorzy/aflorzy-astro"
        ENV = "${ENV}"
        BRANCH_NAME="${BRANCH_NAME}"
    }

    stages {
        stage ('Checkout SCM') {
            steps {
                git branch: "${BRANCH_NAME}", credentialsId: 'gitea', url: 'git@192.168.1.205:aflorzy/aflorzy-astro.git'
            }
        }
        stage ('Setup') {
            steps {
                sh "docker build -f runner.dockerfile -t runner:latest ."
            }
        }
        stage ('Install Dependencies') {
            environment {
                workspace = pwd()
            }
            steps {
                sh "docker run --rm -v ${workspace}:/workspace runner:latest npm install --prefix /workspace"
            }
        }
        stage ('Lint') {
            environment {
                workspace = pwd()
            }
            steps {
                sh "docker run --rm -v ${workspace}:/workspace runner:latest npm run lint --prefix /workspace"
            }
        }
        stage ('Compile') {
            environment {
                workspace = pwd()
            }
            steps {
                sh "docker run --rm -v ${workspace}:/workspace runner:latest npm run build --prefix /workspace"
            }
        }
        stage ('Build Docker Image') {
            steps {
                // Tag with version and with latest
                sh "docker build -t ${REGISTRY_URL}/${IMAGE_NAME}:${VERSION_IMAGE_LABEL} -t ${REGISTRY_URL}/${IMAGE_NAME}:latest ."
            }
        }
        stage ('Push Docker Image to Registry') {
            steps {
                script {
                    // Log in to the Docker registry
                    sh """
                        echo ${REGISTRY_CREDENTIALS_PSW} | docker login ${REGISTRY_URL} -u ${REGISTRY_CREDENTIALS_USR} --password-stdin
                    """

                    def VERSIONED_TAG = "${REGISTRY_URL}/${IMAGE_NAME}:${VERSION_IMAGE_LABEL}";

                    sh "docker push ${VERSIONED_TAG}"

                    // Remove image to save disk space
                    sh "docker image rm -f ${VERSIONED_TAG}"

                    // Conditionally push the latest tag based on the environment
                    if (ENV == 'prod') {
                        def LATEST_TAG = "${REGISTRY_URL}/${IMAGE_NAME}:latest"

                        sh "docker push ${LATEST_TAG}"

                        // Remove image to save disk space
                        sh "docker image rm -f ${LATEST_TAG}"
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Log Out of Docker Registry'
            sh "docker logout ${REGISTRY_URL}"

            echo 'Prune Docker Images'
            sh "docker system prune -af"
        }
    }
}
