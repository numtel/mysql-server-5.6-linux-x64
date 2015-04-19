cd ${0%/*}
LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH ./mysqld --defaults-file=my.cnf --tmpdir=$(mktemp -d -t)
