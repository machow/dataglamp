library(testwhat)
library(rjson)

unused <- c('test_correct')

to_parse <- c(
  'test_object',
  'test_function',
  'test_an_object',
  'test_function_definition',
  'success_msg',
  'test_data_frame',
  'test_error',
  'test_expression_output',
  'test_expression_result',
  'test_file_exists',
  'test_for_loop',
  'test_if_else',
  'test_loop',
  'test_or',
  'test_output_contains',
  'test_output_regex',
  'test_while_loop'
)

# parsers for each field we're creating
arg <- list(
  name    =  function(val, k) k,
  content =  function(val, k) "",
  default =  function(val, k) deparse(val),
  type    =  function(val, k) {
    if (is.name(val) && as.character(val) == "") "positional"
    else "keyword"
  },
  isExpr  =  function(val, k) grepl("test|expr", k)
)
# wrapper to produce parser_name: output list
make_data <- function(val, k)
  sapply(arg, function(f, ...) f(...), val, k)

# apply to testwhat functions
dat <- sapply(to_parse, function(f_name){
  f <- getFromNamespace(f_name, "testwhat")
  formf <- formals(f)
  # list with [name, ...list_argN]
  c(f_name, mapply(make_data, formf, names(formf), SIMPLIFY=FALSE, USE.NAMES = FALSE))
})

cat(rjson::toJSON(dat), file="src/sct_rules.json")

?testwhat::test_correct
dat
lapply(dat, function(l) sum(sapply(l[2:length(l)], function(entry) entry['type']=="positional")))
