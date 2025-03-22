"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8833],{8475:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>t,toc:()=>c});var t=r(7273),a=r(4848),s=r(8453);const i={title:"Wring simple parser with Megaparsec in Haskell",tags:["haskell","parsing","programming"]},l="Wring simple parser with Megaparsec in Haskell",o={authorsImageUrls:[]},c=[{value:"Normal workflow",id:"normal-workflow",level:2},{value:"Representing data",id:"representing-data",level:2},{value:"Parser",id:"parser",level:2},{value:"Parser rules",id:"parser-rules",level:2},{value:"Printing",id:"printing",level:2},{value:"Conclusion",id:"conclusion",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"There goes around opinion that pure functional languages are rock solid and well suited for critical systems.\nFor example Facebook uses it in anti-spam filters, serval financial companies for derivative modelling\nand there is also some documented usage in compilers."}),"\n",(0,a.jsx)(n.p,{children:"I tiptoed in Haskell long time ago, but didn't really get it. This time, my particular usecase was that I wanted to have parser for\ntoy language with minimal effort. Parser combinators like Parsec or Megaparsec are known for purely declarative approach\nto modelling grammars."}),"\n",(0,a.jsx)(n.p,{children:"After 2 weeks of playing with the language I must say that there is something strangely addictive in writing pure functional\ncode. Reading it is hard, writing it even harder, but when it starts to work there is a lot of satisfaction. I don't know\nmaybe I wasn't feeling confident about it before, but I finally started to like it."}),"\n",(0,a.jsx)(n.p,{children:"In this short writing we are going to write simple application that reads in json, validates it and then pretty prints to\nthe console. I used Megaparsec because its newer and has better error messages, but 99% could be written in parsec as well.\nOn the fly I will showcase some Haskell idioms I learned on the way."}),"\n",(0,a.jsx)(n.h2,{id:"normal-workflow",children:"Normal workflow"}),"\n",(0,a.jsx)(n.p,{children:"In haskell every function is a pure function, which means it's idepotent. Side effects like IO are nicely contained in scope in\nmonads. What you get is that because there is no mutable state all the work is really composition of functions. It's a little bit\nintellectually demanding, but once you wrote it right, it's hard to see it failing."}),"\n",(0,a.jsx)(n.p,{children:"Most of the testing happens in REPL. Once you set up Stack or Cabal project you write functions in library module and the load it in REPL and\ntest the functions."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"stack ghci\nghci> \n"})}),"\n",(0,a.jsx)(n.p,{children:"From there you can use various tools but most helpful is probably checking types of the functions."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"ghci> import Data.List\nghci> :t concat\nconcat :: Foldable t => t [a] -> [a]\n"})}),"\n",(0,a.jsx)(n.p,{children:"Then you can test the function directly in REPL"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'ghci> concat ["Hello", " ", "World"]\n"Hello World"\n'})}),"\n",(0,a.jsx)(n.p,{children:"There are 2 things at play here in this example:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"haskell has parameteric polymorphism, which means you can have some abstract type a (like generics)"}),"\n",(0,a.jsx)(n.li,{children:"string is actually list of char [Char]"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"If you are stubborn you can of course write tests in HUnit, but since you can test it in REPL I don't think\nanyone writes them. But several libraries exist like HUnit."}),"\n",(0,a.jsx)(n.h2,{id:"representing-data",children:"Representing data"}),"\n",(0,a.jsx)(n.p,{children:"Haskell has no oop concepts so everthing is represented as Algebraic Data Types (or Generalized Algebraic Data Types for more power).\nADTs have two flavors:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Sum types A or B"}),"\n",(0,a.jsx)(n.li,{children:"Product types tuples (A, B)"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"This is how I represented internal JSON structure"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"data VNumber = VInt Integer |  VDouble Double\n    deriving (Show, Eq)\n\ndata VJson =\n    VNumber VNumber\n    | VString String\n    | VBool Bool\n    | VNull\n    | VArray [VJson]\n    | VObject [(String, VJson)]\n    deriving (Show, Eq)\n"})}),"\n",(0,a.jsx)(n.p,{children:"VJSON is sum type of couple of variants. It think it's self explanatory, except the deriving part. Since we are building on\ntop of built in types like Integer, Double and String, typeclass Show (printing to console) and Eq can be autogenerated. Typeclasses\nfor now are like constraints on wildcard generic types the expose some behaviour."}),"\n",(0,a.jsx)(n.h2,{id:"parser",children:"Parser"}),"\n",(0,a.jsx)(n.p,{children:"All parsing happens inside monad Parsec."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"Parsec e s a \n"})}),"\n",(0,a.jsx)(n.p,{children:"where\ne - custom exception,"}),"\n",(0,a.jsx)(n.p,{children:"s - stream type, can be String, Text, or ByteString,"}),"\n",(0,a.jsx)(n.p,{children:"a returned structure."}),"\n",(0,a.jsx)(n.p,{children:"so for this simple parser I created type alias"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"type Parser = Parsec Void String\n"})}),"\n",(0,a.jsx)(n.p,{children:'You may notice the last type on the rhs is not defined so it "floats" to the definition on the left.'}),"\n",(0,a.jsx)(n.p,{children:"The flow is that you compose the smaller parsers into bigger parsers up to the top and the run topmmost one\nwith function parse"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"ghci> :t parse\nparse\n  :: Parsec e s a -> String -> s -> Either (ParseErrorBundle s e) a\n"})}),"\n",(0,a.jsx)(n.p,{children:"So it takes our parser, debugging message, text to parse and returns either Left error or Right result."}),"\n",(0,a.jsx)(n.p,{children:"For now let's see how the main function looks like:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'run :: IO ()\nrun  = do \n    args <- getArgs\n    case args of \n        [filePath] -> do \n            content <- readFile filePath\n            let parseResult = parse value "" content \n            case parseResult of \n                Left err -> putStr $ errorBundlePretty err \n                Right v -> putStr $ prettyJson v 0\n        _ -> putStr "Usage: program <filepath> \\n"\n'})}),"\n",(0,a.jsx)(n.p,{children:"Pattern matching is easy to guess but for people unfamiliar with monads I will draw an analogy\nfor do notation in Java. So you have a method to that for each element returns a stream"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"Stream<Integer> foo(Integer i) {\n    return Stream.of(i, i+1);\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"And then you have a stream of 2 elements."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"Stream nums = Stream.of(1,3)\n"})}),"\n",(0,a.jsx)(n.p,{children:"And finally you may recall that there is a method flatMap, so combining everthing together"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"Stream.of(1,3).flatMap(this::foo) // == Stream.of(1,2,3,4)\n"})}),"\n",(0,a.jsx)(n.p,{children:"So this is much like working with monads. The foo method works on extracted value from the previous monad\nand returns back new monad. This particular monad has intrisinc behavior so it flattens the nested streams\nbut the behavior itself could be anyting you want it to be. You can chain multiple foos\nand in the end you will get back monad."}),"\n",(0,a.jsx)(n.p,{children:"So do notation is much alike that it allows to chain previous monadic function to the next."}),"\n",(0,a.jsx)(n.h2,{id:"parser-rules",children:"Parser rules"}),"\n",(0,a.jsx)(n.p,{children:"Let's start by parsing trivial cases of true, false and null."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'literal :: Parser VJson\nliteral = do\n    lit <- choice [C.string "true", C.string "false", C.string "null"]\n         <?> "only \'true\', \'false\' and \'null\' literals are valid"\n    _ <- notFollowedBy C.alphaNumChar <?> "only \'true\', \'false\' and \'null\' literals are valid"\n    if lit == "true" then\n        return $ VBool True\n    else if lit == "false" then\n        return $ VBool False\n    else\n        return VNull\n'})}),"\n",(0,a.jsx)(n.p,{children:"From the first parts:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'C.string "true"\n'})}),"\n",(0,a.jsx)(n.p,{children:'returns a parser that takes up "true" from the input or fails if not met.'}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'choice [string "a", string "b"]\n'})}),"\n",(0,a.jsx)(n.p,{children:'returns composite parser that if string "a" fails then follows to the next parser up to exhaustion.'}),"\n",(0,a.jsx)(n.p,{children:"Then we save result in variable."}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"<?>"}),"  allows for customizing failure message if the whole rule fails. It's like returning parser monad that always\nfails with this message."]}),"\n",(0,a.jsx)(n.p,{children:"Finally we make sure that literals have no trailers which allows us to fail exactly in this place not in some time later."}),"\n",(0,a.jsx)(n.p,{children:"One of the monad methods is return which just wraps a value in the monad"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"return $ VBool False\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"$"})," means evaluate what is on the right side and apply it to left side. It's needed here because evaluation happens from left to right."]}),"\n",(0,a.jsx)(n.p,{children:"Next"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"stringLiteral :: Parser VJson\nstringLiteral = do\n    _ <- C.char '\"'\n    content <- many (chunk \"\\\\\\\"\" <|> (:[]) <$> anySingleBut '\"')\n    _ <- C.char '\"'\n    return $ VString (concat content)\n"})}),"\n",(0,a.jsx)(n.p,{children:"First match '\"' single character then take zero or more parts that"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'chunk "\\\\\\"" <|> (:[]) <$> anySingleBut \'"\'\n'})}),"\n",(0,a.jsx)(n.p,{children:'Matches 2 chars \\ and " if that fails try parsing any char that is not ".'}),"\n",(0,a.jsxs)(n.p,{children:["One word of explanation for ",(0,a.jsx)(n.code,{children:"<$>"}),". This operator takes a function (conversion to list or appending empty list afterwards)\nand applies it inside the monad resulting in new monad with the result from function."]}),"\n",(0,a.jsx)(n.p,{children:"The most hard is parsing number"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"zero :: Parser String\nzero = C.string \"0\"\n\ndigitFromOne :: Parser Char\ndigitFromOne = oneOf ['1'..'9']\n\nwholePart :: Parser String\nwholePart = choice [\n    zero,\n     ((++) . (: []) <$> digitFromOne) <*> many C.digitChar]\n\nfractPart :: Parser String\nfractPart  = do\n    dot <- C.char '.'\n    fract <- some C.digitChar\n    return $ dot : fract\n\nexpPart  :: Parser String\nexpPart = do\n    e <- oneOf ['E', 'e']\n    sign <- option \"\" ((:[]) <$> oneOf ['+', '-'])\n    num <- some C.digitChar\n    return $ e : (sign ++ num)\n\n\n\nnumber :: Parser VJson\nnumber = do\n    sign <- option \"\" ((:[]) <$> oneOf ['+', '-'])\n    wh <- wholePart <?> \"whole part of number\"\n    fract <- option \"\" fractPart\n    e <- option \"\" expPart\n    if null fract  && null e then\n        return $ VNumber (VInt $ read (sign ++ wh))\n    else\n        return $ VNumber (VDouble $ read (sign ++ wh ++ fract ++ e))\n"})}),"\n",(0,a.jsx)(n.p,{children:"Explanations:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"((++) . (: []) <$> digitFromOne) <*> many C.digitChar]\n"})}),"\n",(0,a.jsxs)(n.p,{children:["First convert char to String (with single char) inside monad. Then take this result and concat it with string\nparsed by ",(0,a.jsx)(n.code,{children:"many"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"ghci> :t option\noption :: GHC.Base.Alternative m => a -> m a -> m a\n"})}),"\n",(0,a.jsx)(n.p,{children:"So option takes a default value, and a monad return new monad with possibly default applied."}),"\n",(0,a.jsx)(n.p,{children:"So for example what this does"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'e <- option "" expPart\n'})}),"\n",(0,a.jsxs)(n.p,{children:["is that if ",(0,a.jsx)(n.code,{children:"expPart"}),' matches it returns string otherwise empty string "" is assigned.']}),"\n",(0,a.jsx)(n.p,{children:"Then array value"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"array :: Parser VJson\narray = do\n    _ <- C.char '['\n    arr <- value `sepBy` C.char ','\n    _ <- C.char ']'\n    return $ VArray arr\n"})}),"\n",(0,a.jsx)(n.p,{children:"And object"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"keyValuePair :: Parser (String, VJson)\nkeyValuePair = do\n    C.space\n    VString key <- stringLiteral\n    C.space\n    _ <- C.char ':'\n    v <- value\n    return (key, v)\n\n\nobject :: Parser VJson\nobject = do\n    _ <- C.char '{'\n    kvs <- keyValuePair `sepBy` C.char ','\n    _ <- C.char '}'\n    return $ VObject kvs\n"})}),"\n",(0,a.jsx)(n.p,{children:"Now that we have all the rules it is time to combine them"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:"value :: Parser VJson\nvalue = do\n    C.space\n    v <- try literal <|> try stringLiteral <|> try number <|> try array <|> object\n    C.space\n    return v\n"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"try"})," tries parsing rule without consuming the input, note the last alternative is without try\nto guarantee progress. It is a nice trick to consume spaces before and after proper value."]}),"\n",(0,a.jsx)(n.p,{children:"Megaparsec include test method parseTest. Let's try it:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'ghci> parseTest value "{\\"a\\" : 1, \\"b\\" : [1.0, 2.0]}"\nVObject [("a",VNumber (VInt 1)),("b",VArray [VNumber (VDouble 1.0),VNumber (VDouble 2.0)])]\n'})}),"\n",(0,a.jsx)(n.h2,{id:"printing",children:"Printing"}),"\n",(0,a.jsx)(n.p,{children:"Some branches are easy but some are complicated:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'prettyJson :: VJson -> Int -> String\nprettyJson VNull _ = "null"\nprettyJson (VBool True) _ = "true"\nprettyJson (VBool False) _ = "false"\nprettyJson (VNumber (VInt i)) _ = show i\nprettyJson (VString s) _ = "\\"" ++ s ++ "\\""\nprettyJson (VNumber (VDouble d)) _ = show d\nprettyJson (VArray arr) ind = "[" ++ printElems arr (ind+2) ++ "\\n" ++ indent ind "]\\n"\n    where \n        printElems (a:as) i = foldl \n            (\\acc x -> acc ++ ",\\n" ++ indent i "" ++ prettyJson x i) ("\\n" ++ indent i "" ++ prettyJson a i) as\n        printElems [] _ = ""\n        indent i s = replicate i \' \' ++ s\nprettyJson (VObject arr) ind = "{" ++ printElems arr (ind+2) ++ "\\n" ++ indent ind "}\\n"\n    where \n        printElems ((k, v):as) i = foldl \n            (\\acc (k2, v2) -> acc ++ ",\\n" ++ indent i "" ++ "\\"" ++ k2 ++ "\\" : " ++ prettyJson v2 i) \n            ("\\n" ++ indent i "" ++ "\\"" ++ k ++ "\\" : " ++ prettyJson v i) \n            as\n        printElems [] _ = ""\n'})}),"\n",(0,a.jsx)(n.p,{children:"Let's only concentrate on VArray branch"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-haskell",children:'prettyJson (VArray arr) ind = "[" ++ printElems arr (ind+2) ++ "\\n" ++ indent ind "]\\n"\n    where \n        printElems (a:as) i = foldl \n            (\\acc x -> acc ++ ",\\n" ++ indent i "" ++ prettyJson x i) ("\\n" ++ indent i "" ++ prettyJson a i) as\n        printElems [] _ = ""\n        indent i s = replicate i \' \' ++ s\n'})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"printElems"}),' is a helper method that prints elements each in new and indented line. The whole trick was that to not include\n"," after last expression. So this is how i did it. First match a list with first element and the rest. Then use ',(0,a.jsx)(n.code,{children:"foldl"})," to reduce\narray of json values to one string. The starting value is the matched first element ",(0,a.jsx)(n.code,{children:"a"}),' and it\'s different. Then reduction function takes\naccumulator and appends next element with "," prepended. And for empty array just return empty string. ',(0,a.jsx)(n.code,{children:"indent"})," is a helper method that prefixes\nthe give string with number of spaces."]}),"\n",(0,a.jsx)(n.p,{children:"Let's test:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"ghci> putStr $ prettyJson ( VArray [(VNumber (VInt 1)), (VNumber (VInt 2))]) 0\n[\n  1,\n  2\n]\nghci> \n"})}),"\n",(0,a.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,a.jsx)(n.p,{children:"That's it  for this simple tutorial. Here is a list of nice readings"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://markkarpov.com/tutorial/megaparsec.html#notfollowedby-and-lookahead",children:"Megaparsec intermediate tutorial"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://smunix.github.io/dev.stephendiehl.com/hask/index.html",children:"What I whish I knew learning Haskell"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://gitlab.haskell.org/ghc/ghc/-/wikis/reading-list",children:"GHC reading list | advanced "})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://smunix.github.io/dev.stephendiehl.com/fun/index.html",children:"Write you a haskell"})}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"I had a lot of fun and eager for new challenges. If I have some spare time maybe I will write how to write System F typechecker\nin Haskell."}),"\n",(0,a.jsx)(n.p,{children:"Thanks for now."}),"\n",(0,a.jsxs)(n.p,{children:["PS Here is the ",(0,a.jsx)(n.a,{href:"https://github.com/vulture-dominiczek/haskell-json-parser",children:"code"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>l});var t=r(6540);const a={},s=t.createContext(a);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(s.Provider,{value:n},e.children)}},7273:e=>{e.exports=JSON.parse('{"permalink":"/blog/2025/03/3/","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2025-03-3.md","source":"@site/blog/2025-03-3.md","title":"Wring simple parser with Megaparsec in Haskell","description":"There goes around opinion that pure functional languages are rock solid and well suited for critical systems.","date":"2025-03-03T00:00:00.000Z","tags":[{"inline":true,"label":"haskell","permalink":"/blog/tags/haskell"},{"inline":true,"label":"parsing","permalink":"/blog/tags/parsing"},{"inline":true,"label":"programming","permalink":"/blog/tags/programming"}],"readingTime":10.715,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Wring simple parser with Megaparsec in Haskell","tags":["haskell","parsing","programming"]},"unlisted":false,"prevItem":{"title":"Semantic search for dynamically built queries in Java and CodeQL","permalink":"/blog/2025/03/9/"},"nextItem":{"title":"Introducing concurrency solver","permalink":"/blog/2025/01/18/"}}')}}]);