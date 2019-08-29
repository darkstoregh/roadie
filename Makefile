ROADIE_TOKEN?=

setup-jenkins-test-environment:
	ROADIE_TOKEN=$(ROADIE_TOKEN) \
	kubectl create secret generic roadie --from-literal=token=${ROADIE_TOKEN}

