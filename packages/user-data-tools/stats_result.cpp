#include "stats_result.hpp"

#include <cinttypes>

namespace mkboard {

bool stats_sample::validate() const { return true; }

bool stats_histogram::validate() const { return true; }

bool stats_result::validate() const { return true; }

} // namespace mkboard
