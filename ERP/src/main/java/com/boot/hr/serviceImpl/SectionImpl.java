package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.hr.model.Section;
import com.boot.hr.repo.SectionRepo;
import com.boot.hr.service.SectionService;
@Service
public class SectionImpl implements SectionService {
	
	@Autowired
	SectionRepo repos;
	
	public boolean saveSection(Section section) {
		section =repos.save(section);
		boolean isSuccess = section.getId()>1;
		return isSuccess;
	}

	
	public boolean updateSubledger(Section section) {
		repos.save(section);
		return true;
	}

	
	public boolean deleteByIdSection(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public Section getByIdSection(Long id) {
		Optional<Section> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<Section> getAllSection() {
		
		return repos.findAll();
	}

}
