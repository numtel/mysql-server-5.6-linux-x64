cd ${0%/*}
mkdir -p data/tmp
LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH ./mysqld --defaults-file=my.cnf
