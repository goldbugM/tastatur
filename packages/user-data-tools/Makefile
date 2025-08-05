COMPILER=g++
CFLAGS=-std=c++20 -Wall -Wextra -fwrapv -O2 -lm

all:
	$(COMPILER) $(CFLAGS) -o mkboard-check-stats \
		buffer.cpp \
		mmapped_file.cpp \
		stats_data.cpp \
		stats_file_name.cpp \
		stats_result.cpp \
		mkboard-check-stats.cpp
	$(COMPILER) $(CFLAGS) -o mkboard-build-histogram \
		buffer.cpp \
		mmapped_file.cpp \
		stats_data.cpp \
		stats_file_name.cpp \
		stats_result.cpp \
		mkboard-build-histogram.cpp

clean:
	rm mkboard-check-stats mkboard-build-histogram

format:
	find . -iname '*.hpp' -o -iname '*.cpp' | xargs clang-format -i
