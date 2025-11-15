import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

export const SearchFilter = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
}: SearchFilterProps) => {
  return (
    <div className="flex gap-4 mb-6">

      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/70" />

        <Input
          placeholder="Search by certificate name..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            pl-11
            bg-white/10 
            border border-white/20 
            text-white 
            placeholder:text-gray-300
            backdrop-blur-md
            focus:ring-2 focus:ring-blue-400/40
            transition-all
          "
        />
      </div>

      {/* Filter Dropdown */}
      <Select value={filterValue} onValueChange={onFilterChange}>
        <SelectTrigger
          className="
            w-[180px]
            bg-white/10
            border border-white/20
            text-white
            backdrop-blur-md
            placeholder:text-gray-300
            focus:ring-2 focus:ring-blue-400/40
            transition-all
          "
        >
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>

        <SelectContent
          className="
            bg-[#0E1A2C]/90 
            text-white
            border border-white/20
            backdrop-blur-xl
          "
        >
          <SelectItem value="all" className="hover:bg-white/10">All Status</SelectItem>
          <SelectItem value="pending" className="hover:bg-white/10">Pending</SelectItem>
          <SelectItem value="verified" className="hover:bg-white/10">Verified</SelectItem>
          <SelectItem value="rejected" className="hover:bg-white/10">Rejected</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
};
