pipeline {
    agent any
    environment {
        BRANCH_NAME = "${gitlabBranch}"
        THINNAI_FRONTEND = "${THINNAI_FRONTEND}"
        THINNAI_BACKEND = "${THINNAI_BACKEND}"
        THINNAI_SERVICE_ACCOUNT = "${THINNAI_SERVICE_ACCOUNT}"
        JOB_NAME = "thinnai"
        WORKSPACE = "${WORKSPACE}-${gitlabBranch}"
        REMOTE_URL="${REMOTE_URL}"
    }
    stages {
        stage("Clone repository & Checkout branch") {
            steps {
                dir("${WORKSPACE}") {
                    
                    script {
               
                    if(!fileExists("$WORKSPACE")) {
                     
                        sh "git clone \"https://bookmythinnai:glpat-UyBBHLox-oBfDZQ3MBz7@gitlab.com/thinnai/web-base.git\" \"${WORKSPACE}\""
                    }
                    sh "git checkout ${BRANCH_NAME}"
                    sh "pwd -P"
                    sh "git fetch && git pull"
                }
            }
        }
        }
        stage("Setting .env files") {
            steps {
                script {
                    writeFile file: "${WORKSPACE}/front/.env", text: "${THINNAI_FRONTEND}"
                    writeFile file: "${WORKSPACE}/.env", text: "${THINNAI_BACKEND}"
                    writeFile file: "${WORKSPACE}/service-account-file.json", text: "${THINNAI_SERVICE_ACCOUNT}"
                }
            }
        }
        stage("Removing build directory") {
            steps {
                sh "rm -rf ${WORKSPACE}/front/build"
            }
        }
        stage("Building Frontend") {
            steps {
                nodejs('lts') {
                    script {
                        if ("${BRANCH_NAME}" == "production") {
                            sh "cd ${WORKSPACE}/front &&  npm install && ulimit -v 1258291200 && PUBLIC_URL='http://www.bookmythinnai.com' npm run build"
                        } else if ("${BRANCH_NAME}" == "preprod") {
                            sh "cd ${WORKSPACE}/front &&  npm install && ulimit -v 1258291200 && PUBLIC_URL='https://preprod.bookmythinnai.com' npm run build"
                        } else if ("${BRANCH_NAME}" == "canary") {
                            sh "cd ${WORKSPACE}/front &&  npm install --force && ulimit -v 1258291200 && PUBLIC_URL='https://canary.bookmythinnai.com' npm run build"
                        }
                    }
                }
            }
        }
        stage("Stopping and Removing Docker Containers") {
            steps {
                sh "docker compose -f ${WORKSPACE}/docker-compose-thinnai-${BRANCH_NAME}.yml down"
                sh "rm -rf ${WORKSPACE}/dist"
            }
        }
        stage("Building Backend") {
            steps {
                nodejs('lts') {
                sh "cd ${WORKSPACE} && npm install --force && npm run build"
                }
            }
        }
        stage("Building && Running Containers") {
            steps {
                sh "cd ${WORKSPACE} && docker build -t thinnai-${BRANCH_NAME}:latest . && docker compose -f ${WORKSPACE}/docker-compose-thinnai-${BRANCH_NAME}.yml up -d"
            }
        }
        stage("Copying Frontend Build Directory") {
            steps {
                script {
                    if (!fileExists("/var/www/${JOB_NAME}-${BRANCH_NAME}")) {
                        sh "mkdir /var/www/${JOB_NAME}-${BRANCH_NAME}"
                    }
                }
                sh "rm -rf /var/www/${JOB_NAME}-${BRANCH_NAME}/*"
                sh "cp -r ${WORKSPACE}/front/build/* /var/www/${JOB_NAME}-${BRANCH_NAME}"
            }
        }
    }
