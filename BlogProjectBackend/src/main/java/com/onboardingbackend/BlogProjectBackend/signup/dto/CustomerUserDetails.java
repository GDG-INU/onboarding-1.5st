package com.onboardingbackend.BlogProjectBackend.signup.dto;

import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomerUserDetails implements UserDetails {
    private final UserEntity userEntity;

    public CustomerUserDetails(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection=new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userEntity.getRole();

            }
        });
        return collection;
    }

    @Override
    public String getPassword() {
        return userEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return userEntity.getEmail();
    }

    public Integer getUserID() {
        return userEntity.getId();
    }

    public String getEmail() {
        return userEntity.getEmail();
    }

    public String getNickname() {
        return userEntity.getNickname();
    }

}
