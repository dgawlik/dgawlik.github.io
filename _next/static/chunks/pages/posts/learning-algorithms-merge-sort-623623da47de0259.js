(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[208],{3905:function(e,t,n){"use strict";n.d(t,{kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"===typeof e?e(t):i(i({},t),e)),n},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),d=u(n),p=o,m=d["".concat(s,".").concat(p)]||d[p]||c[p]||a;return n?r.createElement(m,i(i({ref:t},h),{},{components:n})):r.createElement(m,i({ref:t},h))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"===typeof e||o){var a=n.length,i=new Array(a);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"===typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},9093:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/learning-algorithms-merge-sort",function(){return n(3817)}])},3817:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});n(7294);var r=n(3905),o=n(9008);function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i={},l=function(e){var t=e.children;return(0,r.kt)("main",{className:"md:w-3/5 text-lg mr-auto ml-auto mt-20 pb-20 article"},t)};function s(e){var t=e.components,n=a(e,["components"]);return(0,r.kt)(l,Object.assign({},i,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(o.default,{mdxType:"Head"},(0,r.kt)("script",{defer:!0},"hljs.highlightAll();"),(0,r.kt)("title",null,"Algorithmic Hello World"),(0,r.kt)("meta",{name:"Description",content:"In short article you learn algorithms foundations on the example of Merge Sort and get illustrated Divide and Conquer approach explanation."})),(0,r.kt)("h1",null,"Algorithmic Hello World"),(0,r.kt)("p",null,"You may be wondering why write another tutorial on algorithms if there are so many? Well... For a guy like me quick tut on\nsorting sounded like a good idea for a first post. I bet nobody remembers this stuff couple of years after finishing\nschool. Before getting too technical lets refresh some knowledge of the past..."),(0,r.kt)("h3",null,"What's an algo?"),(0,r.kt)("p",null,"According to Wikipedia an algorithm is a clearly described and implementable set of instructions\nto solve specific kind of problem. You apply it on ",(0,r.kt)("b",null,"input")," and the desired result\nreturned - an ",(0,r.kt)("b",null,"output"),"."),(0,r.kt)("p",null,"Quick example:"),(0,r.kt)("ul",{className:"px-7 py-2 list-disc"},(0,r.kt)("li",null,(0,r.kt)("b",null,"Input"),": unsorted array A = [A1, ... A5]"),(0,r.kt)("li",null,(0,r.kt)("b",null,"Procedure")," (algorithm): Sort(A)"),(0,r.kt)("li",null,(0,r.kt)("b",null,"Output"),": sorted array A' such that A1 < ... < A5")),(0,r.kt)("p",null,"The problem set is quite diverse. Like efficiently finding\nelement with some statistical property in the collection (",(0,r.kt)("b",null,"search problems"),").\nOr minimize a function under some constraints (",(0,r.kt)("b",null,"optimization problems"),"). Despite\nlarge set of problems usually some common patterns do recur during the implementation.\nOne of them is ",(0,r.kt)("b",null,"divide and conquer")," approach in\nwhich we build solutions to complex problems basing on the solved smaller subproblems. "),(0,r.kt)("h3",null,"Why sort?"),(0,r.kt)("p",null,"Take a look at any book in your house, most probably it\nhas an",(0,r.kt)("i",null,"index")," - cross reference of things, people, concepts pointing to specific pages. It is\nordered in lexicograhic order - words starting with ","'","b","'"," go after words starting with ","'","a","'"," and so on.\nThis order is a (one) way to give a structure to collection of words. And imposing structure we can find\nthings quicker."),(0,r.kt)("p",null,"This is the exact purpose of ",(0,r.kt)("b",null,"data structures")," and there can be many of them. What they share in common\nis that they are all aligned to access patterns to make them efficient. For example, binary trees is one way to organize\nour words so that we can find given one in shorter time than exhautive search."),(0,r.kt)("h3",null,"Merge Sort vs Quick Sort"),(0,r.kt)("p",null,"Quick Sort is known to be generally best performing algorithm and consequently is most popular. It is also\nan example of recursive Divide and Conquer approach. But there is a catch: Quick Sort works well for ",(0,r.kt)("b",null,"randomized")," data\nwith which we deal with in most real life examples. But having already some structure in\nto-be-sorted array, it becomes very fragile to corner cases which lead to suboptimal performance (O(N",(0,r.kt)("sup",null,"2"),"))."),(0,r.kt)("p",null,"A quick summary how Quick Sort works: "),(0,r.kt)("ul",{className:"px-7 py-2 list-disc"},(0,r.kt)("li",null,"it partitions original subarray by choosing split element - ",(0,r.kt)("b",null,"pivot")),(0,r.kt)("li",null,"any element less or equal than ",(0,r.kt)("b",null,"pivot")," is moved to left partition, the other to the right partition"),(0,r.kt)("li",null,"left and right partitions are sorted recursively")),"The method we choose pivot determines how well algorithm will perform on that data. If we chose pivot to be last element for example then for already sorted elements array's performance would be O(N^2) as left partition would always have n-1 elements. The same goes for pivot as first element and reverse array order. It is really easy to find counter-examples for any choice of pivot. Merge Sort doesn't have this limitation. At a cost of addtional memory space (buffer array) and a need to copy between arrays, you are completely isolated from the penalty resulting from the order in which array to-be-sorted is laid out.",(0,r.kt)("h3",null,"Divide and Conquer"),(0,r.kt)("a",{href:"https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/"},(0,r.kt)("b",null,"Divide and Conquer"))," approach works by splitting the problem into subsets. Then these subsets are divided further to even smaller subsets. The process repeats until the subproblems are so small that you can't break them to further parts. As a final step subsolutions are combined bottom-up until solution to original problem is found. General template for merge sort is like this:",(0,r.kt)("ul",{className:"px-7 py-2 list-disc"},(0,r.kt)("li",null,(0,r.kt)("b",null,"divide"),": split original array in the middle (if not single element)"),(0,r.kt)("li",null,(0,r.kt)("b",null,"conquer"),": recursively repeat algorithm on left and right subarray"),(0,r.kt)("li",null,(0,r.kt)("b",null,"(combine)")," merge both subarrays in such way that result is sorted array")),(0,r.kt)("figure",{className:"md:p-20 py-10"},(0,r.kt)("img",{alt:"Merge Sort: divide step",src:"/drawing-1.svg",width:"90%",height:"90%"}),(0,r.kt)("figcaption",{className:"font-bold text-center"},"Merge Sort: divide step")),(0,r.kt)("figure",{className:"md:px-20 py-10"},(0,r.kt)("img",{alt:"Merge and Combine: conquer step",width:"90%",height:"90%",src:"/drawing-2.svg"}),(0,r.kt)("figcaption",{className:"font-bold text-center"},"Merge and Combine (conquer step)")),(0,r.kt)("p",null," The sorting itself is done in the combine step. We have buffer array which will hold combined result.\nMerging involves examining elements from left and\nright sub-array and putting in the buffer smaller number at each step. "),(0,r.kt)("h3",null,"Coding in Java"),(0,r.kt)("p",null," Let","'","s start with birds-eye template which structures our code."),(0,r.kt)("pre",{className:"p-5"},(0,r.kt)("code",{className:"language-java"},"\npublic class Sorter {\n\n  public void sort(int[] toSort) {\n  }\n\n  public void mergeSort(int[] toSort, int start, int end) {\n  }\n\n  public void merge(int[] toSort, int leftStart, int rightStart, int rightEnd) {\n\n  }\n}\n")),(0,r.kt)("p",null," Entry point to the algotithm is ",(0,r.kt)("code",null,"sort")," method. It wraps ",(0,r.kt)("code",null,"mergeSort"),", because\ndoing recursion we have to specify range on which method will act upon. All methods do sorting in place, by\npassing Java","'","s reference to array. This code is for demonstration only, so for clarity we won","'","t\nuse ",(0,r.kt)("a",{href:"https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html"},(0,r.kt)("b",null,"Comparator"))," to\ncompare the objects. ",(0,r.kt)("code",null,"merge")," does the heavy lifting and it","'","s result is adjacent left and right halves\ntransformed to single sorted array."),(0,r.kt)("pre",{className:"p-5"},(0,r.kt)("code",{className:"language-java"},"\npublic void mergeSort(int[] toSort, int start, int end) {\n  if (end - start > 1) {                  // 1\n    int middle = (start + end + 1) / 2;   // 2\n    mergeSort(toSort, start, middle);     // 3\n    mergeSort(toSort, middle, end);\n    merge(toSort, start, middle, end);    // 4\n  }\n}\n")),(0,r.kt)("p",null,"To know which part of the array we apply Merge Sort to we need range","'","s start and end. Note that start is inclusive and end is exclusive.\nMain points from the snippet:"),(0,r.kt)("ul",{className:"px-7 list-decimal p-5"},(0,r.kt)("li",null,"This is a ",(0,r.kt)("b",null,"stopping condition"),". If array has only one element nothing has to be done."),(0,r.kt)("li",null,"If range is greater than 1, we split it into halves. Middle is our split position, we round it upwards in case of an odd size."),(0,r.kt)("li",null,(0,r.kt)("b",null,"Divide part"),": each half is sorted separately."),(0,r.kt)("li",null,(0,r.kt)("b",null,"Combine part"),": halves are already sorted and we can merge them.")),(0,r.kt)("pre",{className:"p-5"},(0,r.kt)("code",{className:"language-java"},"\npublic void merge(int[] toSort, int leftStart, int rightStart, int rightEnd) {\n  int left = leftStart;                                                   // 1\n  int right = rightStart;\n\n  int[] buffer = new int[rightEnd - leftStart];\n  int index = 0;\n\n  while (left < rightStart && right < rightEnd) {                         // 2\n    if (toSort[left] <= toSort[right]) {\n      buffer[index++] = toSort[left++];\n    } else {\n      buffer[index++] = toSort[right++];\n    }\n  }\n\n  System.arraycopy(toSort, left, buffer, index, rightStart - left);       // 3\n  System.arraycopy(toSort, right, buffer, index, rightEnd - right);\n  System.arraycopy(buffer, 0, toSort, leftStart, rightEnd - leftStart);   // 4\n}\n")),(0,r.kt)("p",null,"Merge part is where most action happens..."),(0,r.kt)("ul",{className:"px-7 py-2 list-decimal p-5"},(0,r.kt)("li",null,"In the ",(0,r.kt)("code",null,"merge")," method we simultaneously iterate through left and right half. At each time items from left and right are compared and minimum is copied to buffer, appropirate index is advanced. ",(0,r.kt)("code",null,"left")," is for left half index, ",(0,r.kt)("code",null,"right")," is for right half index."),(0,r.kt)("li",null,"The loop continues until he end of either left or right half is reached. At each step left and right current elements are compared and the smaller is taken and written to buffer. Buffer at all times holds sorted subarray. Each loop expands it by one, until stopping condidion C stops being true: either left or right array is out of elements."),(0,r.kt)("li",null,"At this place one of the halves is completely processed but one can have remaining elements. But we don't know which is which. This doesn't matter because we can derive elements to copy from left and right index and copying 0 elements doesn't change the state of buffer array. So we call copying on both halves."),(0,r.kt)("li",null,"Finally the buffer array holds sorted solution for this range. It is copied back to original array.")),(0,r.kt)("p",null,"We used ",(0,r.kt)("a",{href:"https://docs.oracle.com/javase/7/docs/api/java/lang/System.html#arraycopy(java.lang.Object,%20int,%20java.lang.Object,%20int,%20int)"},(0,r.kt)("b",null,"System.arraycopy()"))," in our solution. This is the fastest way to copy elements among the array."),(0,r.kt)("pre",null,(0,r.kt)("code",{className:"p-5"},"\nSystem.arraycopy(\nsourceArray, sourceFromElement,\ndestinationArray, destinationFromElemement,\nnumberOfElements)\n  ")),(0,r.kt)("p",null,"Whole solution looks like this:"),(0,r.kt)("pre",{className:"p-5"},(0,r.kt)("code",{className:"language-java"},"\npublic class Sorter {\n\n  public void sort(int[] toSort) {\n    mergeSort(toSort, 0, toSort.length);\n  }\n\n  public void mergeSort(int[] toSort, int start, int end) {\n    if (end - start > 1) {\n      int middle = (start + end + 1) / 2;\n      mergeSort(toSort, start, middle);\n      mergeSort(toSort, middle, end);\n      merge(toSort, start, middle, end);\n    }\n  }\n\n  public void merge(int[] toSort, int leftStart, int rightStart, int rightEnd) {\n  int left = leftStart;\n  int right = rightStart;\n\n  int[] buffer = new int[rightEnd - leftStart];\n  int index = 0;\n\n  while (left < rightStart && right < rightEnd) {\n    if (toSort[left] <= toSort[right]) {\n      buffer[index++] = toSort[left++];\n    } else {\n      buffer[index++] = toSort[right++];\n    }\n  }\n\n  System.arraycopy(toSort, left, buffer, index, rightStart - left);\n  System.arraycopy(toSort, right, buffer, index, rightEnd - right);\n  System.arraycopy(buffer, 0, toSort, leftStart, rightEnd - leftStart);\n  }\n}  \n")),(0,r.kt)("p",null,"Next you can fix some simple JUnit test which generates two identical random arrays, sorts one with Java and\nsecond with the Sorter class. If they they have same contents (order) the test will pass."),(0,r.kt)("pre",{className:"p-5"},(0,r.kt)("code",{className:"language-java"},"\nclass SorterTest {\n\n  @Test\n  public void sorting_works() {\n    var rng = new Random(17);\n\n    var array = new int[20];\n    var reference = new int[20];\n    for (int i = 0; i < 20; i++) {\n      array[i] = rng.nextInt() % 100;\n      reference[i] = array[i];\n    }\n\n  var sut = new Sorter();\n\n  Arrays.sort(reference);\n  sut.sort(array);\n\n  assertArrayEquals(array, reference);\n  }\n}\n")),(0,r.kt)("h3",null,"Interesting property"),(0,r.kt)("p",null,"Merge sort requires ",(0,r.kt)("b",null,"minimum number of comparisons"),". You may have known that theoretic complexity bound on\nsorting by comparison is ",(0,r.kt)("a",{href:"https://www.quora.com/Why-is-the-%CE%A9-n-log-n-lower-bound-on-comparison-sorting-algorithms-called-the-information-theoretic-limit"},(0,r.kt)("b",null,"O(N log N)")),".\nWith Merge Sort you will always get that complexity for whatever the data. To understand why is it the case let","'","s step back a bit and\ntalk about ",(0,r.kt)("b",null,"perfect binary trees"),"."),(0,r.kt)("p",null,"Imagine the following structure: there are nodes and links. Each node either has 2 links to other nodes (they are it","'","s children) or doesn","'","t\nhave links at all. Those nodes without children are only at the bottom and are called leaves. Consequently at the top we have one node,\none layer below 2 nodes, next 4, 8, 16, ..., 2",(0,r.kt)("sup",null,"k")," nodes at each layer. This is a perfect binary tree. As it turns out recursion in Merge Sort forms\nexactly such a tree, with nodes as sub-arrays."),(0,r.kt)("p",null,"On the bottom of the tree you have n single element sub-arrays. On the top you have one root node with array of n elements. Obviously at\neach level if we count number of elements it will be the same. But moving from the bottom to top of the tree each time there are two times less the nodes at current level.\nSo it is easy to see that the number of levels is O(logN)"),(0,r.kt)("p",null,"To ",(0,r.kt)("code",null,"merge")," two sub-arrays of length N and M we have to do exactly ",(0,r.kt)("b",null,"N + M - 1")," comparisons.\nIf we merged all the sub-arrays on one level it would require roughly O(N) comparisons. And since this is perfect binary tree,\nthere is O(logN) levels. So total, there is O(N logN) comparisons. Having somehow degenerate tree would require us to unnecesarily repeat some\nof the comparisons yielding suboptimal performance. "),(0,r.kt)("p",null,"That was some first post! Thanks for reading."),(0,r.kt)("br",null),(0,r.kt)("br",null))}s.isMDXComponent=!0},9008:function(e,t,n){e.exports=n(5443)}},function(e){e.O(0,[774,888,179],(function(){return t=9093,e(e.s=t);var t}));var t=e.O();_N_E=t}]);