(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{3905:function(e,t,n){"use strict";n.d(t,{kt:function(){return k}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"===typeof e?e(t):s(s({},t),e)),n},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),k=c(n),d=r,f=k["".concat(i,".").concat(d)]||k[d]||p[d]||o;return n?a.createElement(f,s(s({ref:t},u),{},{components:n})):a.createElement(f,s({ref:t},u))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"===typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"===typeof e?e:r,s[1]=l;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7356:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/kafka",function(){return n(7058)}])},7058:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});n(7294);var a=n(3905),r=n(9008);function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s={},l=function(e){var t=e.children;return(0,a.kt)("main",{className:"md:w-3/5 text-lg mr-auto ml-auto mt-20 pb-20 article"},t)};function i(e){var t=e.components,n=o(e,["components"]);return(0,a.kt)(l,Object.assign({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(r.default,{mdxType:"Head"},(0,a.kt)("script",{defer:!0},"hljs.highlightAll();"),(0,a.kt)("title",null,"Kafka on Kubernetes: exercise"),(0,a.kt)("meta",{name:"Description",content:"Kafka on Kubernetes: exercise"})),(0,a.kt)("h1",null,"Kafka on Kubernetes: exercise"),(0,a.kt)("p",null,"Some projects make a heavy use of Kafka while also being on Kubernetes. The two don't go well together that's for sure.\nSo sometimes it turns out companies spawn only one instance of Kafka which is suboptimal solution. I found it interesting\ntopic to write how to setup cluster of Kafkas on k8s."),(0,a.kt)("h3",null,"Kafka clustering"),(0,a.kt)("p",null,"Up to version 2.8 Kafka relied only on ",(0,a.kt)("b",null,"Zookeeper")," for managing it's state and leader election. In a Kafka cluster\nproducers write to ",(0,a.kt)("b",null,"leader")," and it's ",(0,a.kt)("b",null,"partitions get replicated by topic to other nodes"),". The leader has ",(0,a.kt)("b",null,"controller")," that\nmanages this stuff. And Zookeeper oversees this communication and maintains state."),(0,a.kt)("p",null,"As Confluent team states the replication with zookeeper became increasingly complex, so they started looking for a way to\nsolve it. In version 2.8 ",(0,a.kt)("a",{href:"https://developer.confluent.io/learn/kraft/"},"KRaft mode")," was introduced and it completely\ngoes without Zookeeper. All the synchronization happens just between the brokers. It is said that it is much faster with\nbig amount of topics."),(0,a.kt)("figure",{className:"mt-10"},(0,a.kt)("img",{className:"mx-auto",src:"/kraft.png",width:"60%",height:"60%"})),(0,a.kt)("p",null,"We will try classic approach with zookeeper because Kraft is not advised for production yet."),(0,a.kt)("h3",null,"Setting up the cluster"),(0,a.kt)("p",null,"For Kafka brokers to work we essentially need to set up two config values:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("b",null,"advertised.listeners")," - any instance will broadcast this addresses to clients as reachable brokers"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("b",null,"listeners")," - brokers will listen on these addresses for replication updates"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("b",null,"zookeeper.connect")," - addresses of zookeper cluster nodes")),(0,a.kt)("p",null,"Now with Kubernetes we have a ",(0,a.kt)("b",null,"chicken and egg problem")," that we don't know ",(0,a.kt)("b",null,"cluster ip's")," that will\nget assigned to these pods."),(0,a.kt)("p",null,"The second problem is that we want pods to ",(0,a.kt)("b",null,"have identity"),". If broker 1 fails we want it recover as broker 1 not for ex. broker 4.\nAnd broker 1 should have same volume mounts as before. We would also like to be able to migrate pods between the nodes (if one fails)."),(0,a.kt)("p",null,"How do we solve these?"),(0,a.kt)("p",null,"For the first, we will use ",(0,a.kt)("b",null,"headless service"),'. The trick is that it enables communication\nbetween the pods (but only internally) but it disables the loadbalancing. This way each broker can talk with another by "central hub".\nAnd dns record for the headless service returns all of the pod ips.'),(0,a.kt)("p",null,"For the second there is quite old addition to the Kubernetes: ",(0,a.kt)("b",null,"StatefulSet"),'. Each pod has identity and volume mounts stay the same\nregardless of fortune. Moreover pods get consistent names like "podName-number". We will do that for Kafka only.'),(0,a.kt)("p",null,"Let's assume that we don't need expose kafka outside kubernetes (many times this is the case), then with the above two we are done."),(0,a.kt)("p",null,'So first we are creating "base image" for Kafka.'),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nFROM debian:buster-slim\n\nRUN apt-get update\n\nRUN apt-get install -y wget openjdk-11-jdk gettext-base\n\nRUN wget https://dlcdn.apache.org/kafka/3.1.0/kafka_2.13-3.1.0.tgz\n\nRUN tar -xvf kafka_2.13-3.1.0.tgz\n\nRUN mv kafka_2.13-3.1.0 /kafka\n")),(0,a.kt)("b",null,"Zookeeper"),(0,a.kt)("p",null,"So first we need to setup an image:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},'\nFROM kafka-base:1.0\n\nWORKDIR /kafka \n\nRUN mkdir /tmp/zookeeper\n\nCOPY ./zookeeper-0.properties .\nCOPY ./zookeeper-1.properties .\nCOPY ./zookeeper-2.properties .\n\nCMD export MY_ID="${POD_NAME##*-}" && echo $MY_ID && echo $(($MY_ID+1)) > /tmp/zookeeper/myid && bin/zookeeper-server-start.sh ./zookeeper-$MY_ID.properties\n\n\n\n')),(0,a.kt)("p",null,"We inject env variable POD_NAME, derive number from it and then assign each pod separate configuration. zookeeper-0.properties looks like so:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\ndataDir=/tmp/zookeeper\n\nmaxClientCnxns=0\nadmin.enableServer=false\n\nserver.1=0.0.0.0:2888:3888\nserver.2=zookeeper-statefulset-1.zookeeper-headless.default.svc.cluster.local:2888:3888\nserver.3=zookeeper-statefulset-2.zookeeper-headless.default.svc.cluster.local:2888:3888\n\ntickTime=2000\ninitLimit=5\nsyncLimit=2\nelectionPortBindRetry=100\n\n")),(0,a.kt)("p",null,'we inject id so we know that the first server should bind to generic address to listen to. By this configuration we enabled cluster mode.\nNotice how we use DNS instead of IPs thanks to headless service. The generic address of the pod is\n"pod-name"."service-name".default.svc.cluster.local.'),(0,a.kt)("p",null,"Now comes the time for Kubernetes setup:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},'\napiVersion: v1\nkind: Service\nmetadata:\n  name: zookeeper-headless\n  labels:\n    app: zookeeper-headless\nspec:\n  ports:\n  - port: 2888\n    name: hub\n  - port: 3888\n    name: hub2\n  - port: 2181\n    name: hub3\n  clusterIP: None\n  selector:\n    app: zookeeper\n\n---\n\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: zookeeper-statefulset\nspec:\n  serviceName: "zookeeper-headless"\n  replicas: 3\n  selector:\n    matchLabels:\n      app: zookeeper\n  template:\n    metadata:\n      labels:\n        app: zookeeper\n    spec:\n      containers:\n      - name: zookeeper-container\n        image: zookeeper:1.0\n        imagePullPolicy: Never\n        ports:\n        - containerPort: 2888\n        - containerPort: 3888\n        - containerPort: 2181\n        env:\n        - name: POD_NAME\n          valueFrom:\n            fieldRef:\n              fieldPath: metadata.name\n\n')),(0,a.kt)("p",null,"So we exec:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nkubectl create -f kafka.yaml\n")),(0,a.kt)("p",null,"and check the logs:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nkubectl logs --tail=200 -l app=zookeeper\n")),(0,a.kt)("p",null,"The output assures that the cluster is running:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\n[2022-04-15 09:21:04,017] INFO FOLLOWING - LEADER ELECTION TOOK - 226 MS (org.apache.zookeeper.server.quorum.Learner)\n")),(0,a.kt)("p",null,"So we are done with the zookeeper now it's time for kafka:"),(0,a.kt)("b",null,"Kafka"),(0,a.kt)("p",null,"For Kafka we also prepare a Dockerfile and properties but this time with a slightly different technique. We will\nsubstitute variable in properties fiele with ",(0,a.kt)("b",null,"envsubst")," command. Dockerfile:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},'\nFROM kafka-base:1.0\n\nWORKDIR /kafka \n\nCOPY server.properties .\n\nRUN cat server.properties\n\nRUN mkdir /var/kafka\n\nCMD export MY_ID="${BROKER_ID##*-}" && envsubst < server.properties > server-subst.properties &&  cat server-subst.properties && bin/kafka-server-start.sh server-subst.properties\n\n')),(0,a.kt)("p",null,"And properties file:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nlog.dir = /var/kafka\n\nlistener.security.protocol.map = INTERNAL:PLAINTEXT\n\nbroker.id = $MY_ID\n\nzookeeper.connect = zookeeper-headless.default.svc.cluster.local:2181\n\nlisteners = INTERNAL://0.0.0.0:9092\n\nadvertised.listeners = INTERNAL://kafka-statefulset-$MY_ID.kafka-headless.default.svc.cluster.local:9092\n\ninter.broker.listener.name = INTERNAL\n\n")),(0,a.kt)("p",null,"There we injected Id computed in command. We are passing headless service as zookeeper connection details and pass our\nheadless service for kafka as cluster details."),(0,a.kt)("p",null,"Kubernetes configuration file:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},'\napiVersion: v1\nkind: Service\nmetadata:\n  name: kafka-headless\n  labels:\n    app: kafka-headless\nspec:\n  ports:\n  - port: 9092\n    name: hub\n  clusterIP: None\n  selector:\n    app: kafka\n\n---\n\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: kafka-statefulset\nspec:\n  serviceName: "kafka-headless"\n  replicas: 3\n  selector:\n    matchLabels:\n      app: kafka\n  template:\n    metadata:\n      labels:\n        app: kafka\n    spec:\n      containers:\n      - name: kafka-container\n        image: kafka-broker:1.0\n        imagePullPolicy: Never\n        ports:\n        - containerPort: 9092\n        env:\n        - name: BROKER_ID\n          valueFrom:\n            fieldRef:\n              fieldPath: metadata.name\n\n')),(0,a.kt)("p",null,"This is basically the same configration as with zookeeper so no explanation needed i think."),(0,a.kt)("h3",null,"Testing"),(0,a.kt)("p",null,"Now let's see the queueing in action."),(0,a.kt)("p",null,"Let's run a pod with our base image."),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nkubectl run -i --tty test --image=kafka-base:1.0\n")),(0,a.kt)("p",null,"Now according to this ",(0,a.kt)("a",{href:"https://kafka.apache.org/quickstart"},"quickstart")," we create topic:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nroot@producer:/# /kafka/bin/kafka-topics.sh --create --topic chat --bootstrap-server kafka-headless.default.svc.cluster.local:9092\nCreated topic chat.\n\n")),(0,a.kt)("p",null,"Then produce some strings:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nroot@producer:/# /kafka/bin/kafka-console-producer.sh --topic chat --bootstrap-server kafka-headless.default.svc.cluster.local:9092\n>Hello\n>It's a beautiful day\n>^C\n")),(0,a.kt)("p",null,"And check it works:"),(0,a.kt)("pre",{className:"p-5"},(0,a.kt)("code",{className:""},"\nroot@producer:/# /kafka/bin/kafka-console-consumer.sh --from-beginning --topic chat --bootstrap-server kafka-headless.default.svc.cluster.local:9092\n\nHello\nIt's a beautiful day\n^CProcessed a total of 2 messages\n\n")),(0,a.kt)("h3",null,"Conclusion"),(0,a.kt)("p",null,"You can use Kuberenetes StatefulSet and Headless Service to setup Zookeeper and Kafka clusters. The more the nodes the\nmore resilient the cluster is but this negatively impacts latency and throughput as well."),(0,a.kt)("p",null,"Thanks for reading."),(0,a.kt)("br",null),(0,a.kt)("br",null))}i.isMDXComponent=!0},9008:function(e,t,n){e.exports=n(5443)}},function(e){e.O(0,[774,888,179],(function(){return t=7356,e(e.s=t);var t}));var t=e.O();_N_E=t}]);